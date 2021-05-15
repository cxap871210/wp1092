import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');

  const [cmpType, setCmpType] = useState('name');
  const [ADqueryString_1, setADQueryString_1] = useState('');
  const [ADqueryString_2, setADQueryString_2] = useState('');

  const [operType, setOperType] = useState('larger');
  const [queryString_o, setQueryString_o] = useState('');

  

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };



  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/api/qqq', { params: { queryType, queryString } })// TODO: axios.xxx call the right api
    

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...message);
  };

  const handleADQuery = async () => {
    const {
      data: { messages, message },
    } = await axios.get('/api/ADqqq', { params: { cmpType, ADqueryString_1, ADqueryString_2, operType, queryString_o } })
    

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...message);
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string... (Please enter a name or a subject.)"
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <h2>Enter Advanced Query Below:</h2>
      <h4>(All three attributes are required.)</h4>
      <Row>   
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={cmpType}
              onChange={handleChange(setCmpType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name Filter"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject Filter"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
      </Row>
      <Row>
        <TextField
          inputProps={{min: 0, style: { textAlign: 'center' }}} 
          placeholder={cmpType === "name"? 'Name 1' : 'Subject 1'}
          value={ADqueryString_1}
          onChange={handleChange(setADQueryString_1)}
          style={{ flex: 1 }}
        />
        <h1>or</h1>
        <TextField
          inputProps={{min: 0, style: { textAlign: 'center' }}} 
          placeholder={cmpType === "name"? 'Name 2' : 'Subject 2'}
          value={ADqueryString_2}
          onChange={handleChange(setADQueryString_2)}
          style={{ flex: 1 }}
        />
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={operType}
              onChange={handleChange(setOperType)}
            >
              <FormControlLabel
                value="larger"
                control={<Radio color="primary" />}
                label=">="
              />
              <FormControlLabel
                value="smaller"
                control={<Radio color="primary" />}
                label="<="
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Score"
          value={queryString_o}
          onChange={handleChange(setQueryString_o)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!ADqueryString_1 || !ADqueryString_2 || !queryString_o}
          onClick={handleADQuery}
        >
          Query
        </Button>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
