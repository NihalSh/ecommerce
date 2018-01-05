package persistence

import (
	"encoding/json"
	"fmt"
	"reflect"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type MySqlDbClient struct {
	DbUrl    string
	Db       string
	Table    string
	Username string
	Password string
	db       *sqlx.DB
}

func (m *MySqlDbClient) Open() error {
	var err error
	if m.db, err = sqlx.Connect("mysql", "root:password@tcp("+m.DbUrl+")/"+m.Db); err != nil {
		return fmt.Errorf("OpenDb: Error opening Db with url "+m.DbUrl+": %v", err)
	}
	return nil
}

func (m *MySqlDbClient) FindId(id interface{}, obj IModel) error {
	return m.db.Get(&obj, "SELECT * FROM "+m.Table+" WHERE id=?", id)
}

func (m *MySqlDbClient) FindAll(selector IModel, result interface{}) error {
	js, err := json.Marshal(selector)
	if err != nil {
		return fmt.Errorf("FindAll json.Marshal %v : %v", selector, err)
	}
	selectormap := make(map[string]interface{})
	if err = json.Unmarshal(js, &selectormap); err != nil {
		return fmt.Errorf("FindAll json.Unmarshal %s : %v", js, err)
	}
	query := "SELECT * FROM " + m.Table
	for k, v := range selectormap {
		if v != nil && v != "" {
			if query == "SELECT * FROM "+m.Table {
				query += " WHERE"
			}
			query += " " + k + "=:" + k
		}
	}
	nstmt, err := m.db.PrepareNamed(query)
	fmt.Println(query)
	if err != nil {
		return fmt.Errorf("Prepare named query %v : %v", query, err)
	}
	err = nstmt.Select(result, selectormap)
	if err != nil {
		return fmt.Errorf("SELECT %v result type %T selector %v : %v", nstmt, result, selectormap, err)
	}
	return nil
}

func (m *MySqlDbClient) Create(obj IModel) error {
	query := "INSERT INTO " + m.Table + " VALUES"
	s := reflect.ValueOf(obj).Elem()

	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		query += " " + fmt.Sprintf("%v", f.Interface())
		if i != s.NumField()-1 {
			query += ","
		}
	}

	_, err := m.db.Exec(query)
	if err != nil {
		return fmt.Errorf("INSERT %v : %v", query, err)
	}
	return nil
}

func (m *MySqlDbClient) Save(obj IModel) error {
	query := "UPDATE " + m.Table + " SET"
	s := reflect.ValueOf(obj).Elem()
	typeOfT := s.Type()
	var id string
	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		if typeOfT.Field(i).Tag.Get("db") == "id" {
			id = fmt.Sprintf("%s", f.Interface())
			continue
		}
		query += " " + typeOfT.Field(i).Name + "=" + fmt.Sprintf("%s", f.Interface())
		if i != s.NumField()-1 {
			query += ","
		}
	}

	query += " WHERE id=" + id
	_, err := m.db.Exec(query)
	if err != nil {
		return fmt.Errorf("UPDATE %v : %v", query, err)
	}
	return nil
}

func (m *MySqlDbClient) Delete(obj IModel) error {
	_, err := m.db.Exec("DELETE FROM " + m.Table + " WHERE id=" + fmt.Sprintf("%s", obj.GetId()))
	return err
}

func (m *MySqlDbClient) Close() error {
	return m.db.Close()
	// Does nothing
}

func (m *MySqlDbClient) Seed() error {
	_, err := m.db.Exec("SELECT * FROM " + m.Table)
	if err != nil {
		fmt.Println(schemas["buyingoptions"])
		_, err := m.db.Exec(schemas[m.Table])
		return err
	}
	return nil
	// Does nothing
}

var schemas map[string]string

func init() {
	schemas = make(map[string]string)
	schemas["buyingoptions"] = `CREATE TABLE buyingoptions(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   ItemId VARCHAR(100) NOT NULL,
   SellerId VARCHAR(40) NOT NULL,
   Price INT NOT NULL,
   Qty INT NOT NULL
);`
}
