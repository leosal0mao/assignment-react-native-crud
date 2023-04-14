import React, { useState } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    /****** Q4: Start Coding here. State the correct IP/port******/
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
      /****** Q4: Code Ends here******/
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { titleFilter: '' };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    this.setState({ titleFilter: event.target.value });
  }

  render() {
    const { titleFilter } = "";
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <Text>Filter:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={titleFilter}
          placeholder="Enter a title to filter issues"

        />
        {/****** Q1: Code ends here ******/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  filterInput: {
    height: 40,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
});

const width = [40, 80, 80, 80, 80, 80, 200];

function IssueRow(props) {
  {/****** Q2: Coding Starts here. Create a row of data in a variable******/ }
  const issue = props.issue;
  {/****** Q2: Coding Ends here.******/ }
  return (
    <View style={styles.row}>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Text style={styles.cell}>{issue.id}</Text>
      <Text style={styles.cell}>{issue.status}</Text>
      <Text style={styles.cell}>{issue.owner}</Text>
      {/* <Text style={styles.cell}>{issue.created.toDateString()}</Text> */}
      <Text style={styles.cell}>{issue.created}</Text>
      <Text style={styles.cell}>{issue.effort}</Text>
      {/* <Text style={styles.cell}>{issue.due ? issue.due.toDateString() : ''}</Text> */}
      <Text style={styles.cell}>{issue.due ? '' : ''}</Text>
      <Text style={styles.cell}>{issue.title}</Text>
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}


function IssueTable(props) {

  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );


  {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/ }
  const tableHeader = (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>ID</Text>
      <Text style={styles.headerCell}>Status</Text>
      <Text style={styles.headerCell}>Owner</Text>
      <Text style={styles.headerCell}>Created</Text>
      <Text style={styles.headerCell}>Effort</Text>
      <Text style={styles.headerCell}>Due Date</Text>
      <Text style={styles.headerCell}>Title</Text>
    </View>
  );
  {/****** Q2: Coding Ends here. ******/ }

  return (
    <View style={styles.container}>
      {/****** Q2: Start Coding here to render the table header/rows.**********/}
      {tableHeader}
      {issueRows}
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}


class IssueAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = {
      owner: '',
      title: ''
    };
    this.handleOwnerChange = this.handleOwnerChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  handleOwnerChange(text) {
    this.setState({ owner: text });
  }

  handleTitleChange(text) {
    this.setState({ title: text });
  }
  /****** Q3: Code Ends here. ******/

  handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const issue = {
      owner: this.state.owner,
      title: this.state.title,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    }
    this.props.createIssue(issue);
    this.setState({ owner: '', title: '' });
    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }}
          onChangeText={this.handleOwnerChange}
          value={this.state.owner}
          placeholder="Owner"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white' }}
          onChangeText={this.handleTitleChange}
          value={this.state.title}
          placeholder="Title"
        />
        <Button
          title="Add"
          onPress={this.handleSubmit}
        />
        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

export class BlackList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Start Coding here. Create State to hold inputs******/
    this.state = {
      name: "",
      email: "",
      reason: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Code Ends here. ******/
  }
  /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  handleNameChange(name) {
    this.setState({ name });
  }

  handleEmailChange(email) {
    this.setState({ email });
  }

  handleReasonChange(reason) {
    this.setState({ reason });
  }
  /****** Q4: Code Ends here. ******/

  async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const { name, email, reason } = this.state;
    const response = await fetch("http://localhost:3000/graphql/blacklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, reason }),
    });

    if (!response.ok) {
      console.log("Failed to add to blacklist");
    } else {
      console.log("Successfully added to blacklist");
      this.setState({ name: "", email: "", reason: "" });
    }
    /****** Q4: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput
          placeholder="Name"
          value={this.state.name}
          onChangeText={this.handleNameChange}
        />
        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <TextInput
          placeholder="Reason"
          value={this.state.reason}
          onChangeText={this.handleReasonChange}
        />
        <Button title="Submit" onPress={this.handleSubmit} />
        {/****** Q4: Code Ends here. ******/}
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    // const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }



  render() {
    var issues = [
      { id: 1, status: 'Open', owner: 'John', created: '2022-03-01', effort: 5, due: '2022-04-01', title: 'Issue 1' },
      { id: 2, status: 'Closed', owner: 'Jane', created: '2022-03-05', effort: 3, due: '2022-04-05', title: 'Issue 2' },
      { id: 3, status: 'Open', owner: 'Bob', created: '2022-03-10', effort: 8, due: '2022-04-10', title: 'Issue 3' },
    ];

    return (
      <>
        <View style={styles.container}>
          {/****** Q1: Start Coding here. ******/}
          <IssueFilter />
          {/****** Q1: Code ends here ******/}


          {/****** Q2: Start Coding here. ******/}

          <View style={styles.separator} />
          <IssueTable issues={issues} />
          {/****** Q2: Code ends here ******/}


          {/****** Q3: Start Coding here. ******/}
          <View style={styles.separator} />
          <IssueAdd createIssue={this.createIssue} />

          {/****** Q3: Code Ends here. ******/}

          {/****** Q4: Start Coding here. ******/}
          {/****** Q4: Code Ends here. ******/}
        </View>
      </>
    );
  }
}




