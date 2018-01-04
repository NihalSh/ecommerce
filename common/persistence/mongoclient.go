package persistence

import (
	"context"
	"fmt"

	mgo "gopkg.in/mgo.v2"
)

type MongoDbClient struct {
	DbUrl      string
	Db         string
	Collection string
	session    *mgo.Session
}

func (m *MongoDbClient) MgoCollection() *mgo.Collection {
	return m.Session().DB(m.Db).C(m.Collection)
}

func (m *MongoDbClient) Session() *mgo.Session {
	return m.session.Copy()
}

func (m *MongoDbClient) Open() error {
	if session, err := mgo.Dial(m.DbUrl); err != nil {
		return fmt.Errorf("OpenDb: Error dialing Db with url "+m.DbUrl+" %v", err)
	} else {
		m.session = session
		session.SetMode(mgo.Monotonic, true)
	}
	return nil
}

func (m *MongoDbClient) FindId(ctx context.Context, id interface{}, obj IModel) error {
	c := m.MgoCollection()
	defer c.Database.Session.Close()

	if obj.SetId(id) != nil {
		return ErrNoSuchElement
	}

	return c.FindId(obj.GetId()).One(obj)
}

func (m *MongoDbClient) FindAll(ctx context.Context, selector IModel, result interface{}) error {
	c := m.MgoCollection()
	defer c.Database.Session.Close()
	return c.Find(selector).All(result)
}

func (m *MongoDbClient) Create(ctx context.Context, obj IModel) error {
	c := m.MgoCollection()
	defer c.Database.Session.Close()
	fmt.Println(obj)
	return c.Insert(obj)
}

func (m *MongoDbClient) Save(ctx context.Context, obj IModel) error {
	c := m.MgoCollection()
	defer c.Database.Session.Close()

	if obj.SetId(obj.GetId()) != nil {
		return ErrNoSuchElement
	}
	return c.UpdateId(obj.GetId(), obj)
}

func (m *MongoDbClient) Delete(ctx context.Context, obj IModel) error {
	c := m.MgoCollection()
	defer c.Database.Session.Close()
	fmt.Println(obj.GetId())

	return c.RemoveId(obj.GetId())
}

func (m *MongoDbClient) Close() error {
	m.session.Close()
	return nil
}

func (m *MongoDbClient) Seed() error {
	return nil
	// Does nothing
}
