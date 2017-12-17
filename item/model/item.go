package model

type Review struct {
	Id     string
	Rating int
	ItemID string
	Title  string
	Text   string
	Owner  string
}

type Item struct {
	Id        string
	Name      string
	ReviewIDs []string
}

func (a *Item) ToString() string {
	return a.Id + " " + a.Name
}

func (a *Review) ToString() string {
	return a.Id + " " + a.Title
}
