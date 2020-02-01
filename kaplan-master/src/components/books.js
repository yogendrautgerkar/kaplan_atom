import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: [],
      searchString: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            books: result.items
          });
          this.refs.search.focus();
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    let _users = this.state.books;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _users = _users.filter(function(user) {
        return user.volumeInfo.title.toLowerCase().match(search);
      });
    }
    const { error, isLoaded, books } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "30px"
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>Books</h2>
            <Button variant="contained" color="primary">
              Go To Course
            </Button>
          </div>
          <div>
            <Grid container spacing={4} style={{ paddingBottom: 10 }}>
              <Grid item xs={12} sm={6} lg={6} xl={4}>
                <input
                  type="string"
                  value={this.state.searchString}
                  ref="search"
                  onChange={this.handleChange}
                  placeholder="Search Here"
                  style={{
                    marginBottom: "20px",
                    height: "40px",
                    width: "100%",
                    fontSize: "20px"
                  }}
                />{" "}
                <h1>All Books</h1>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              {_users.map(l => {
                return (
                  <Grid item xs={12} sm={6} lg={6} xl={4}>
                    <Card style={{ borderLeft: "4px #ffa839 solid" }}>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                          {l.volumeInfo.title}
                        </Typography>
                        <Typography component="p" variant="body1">
                          Authors: {l.volumeInfo.authors}
                        </Typography>
                        <Typography component="p" variant="body1">
                          Publisher: {l.volumeInfo.publisher}
                        </Typography>
                        <Typography component="p" variant="body1">
                          Published Date: {l.volumeInfo.publishedDate}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </div>
      );
    }
  }
}

export default Books;
