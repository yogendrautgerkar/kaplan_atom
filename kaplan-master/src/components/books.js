import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      books: []
    };
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
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
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
          <Grid container spacing={4} style={{ paddingBottom: 10 }}>
            <Grid item xs={12} sm={6} lg={6} xl={4}>
              <TextField id="standard-basic" label="Search" fullWidth="true" />
              <h1>All Books</h1>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            {books.map(item => (
              <Grid item xs={12} sm={6} lg={6} xl={4}>
                <Card key={item.id} style={{ borderLeft: "4px #ffa839 solid" }}>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {item.volumeInfo.title}
                    </Typography>
                    <Typography component="p">
                      Authors: {item.volumeInfo.authors}
                    </Typography>
                    <Typography component="p">
                      Publisher: {item.volumeInfo.publisher}
                    </Typography>
                    <Typography component="p">
                      Published Date: {item.volumeInfo.publishedDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      );
    }
  }
}

export default Books;
