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
  height: 50px;
`;

const QueryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 1em;
  height: 50px;
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 25px;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const QuerySection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1em;
  height: 180px;
`;

const QueryTypes = styled.div`
  width: 100%;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [QName, setQName] = useState('N');
  const [QSubject, setQSubject] = useState('N');
  const [QScore, setQScore] = useState('N');
  const [QNameString, setQNameString] = useState('');
  const [QSubjectString, setQSubjectString] = useState('');
  const [QScoreString, setQScoreString] = useState('');
  const [sort, setSort] = useState('N');
  const [sortMethod, setSortMethod] = useState('L')

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post('/create-card', {
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
    } = await axios.post('/query', {
      QName,
      QSubject,
      QScore,
      QNameString,
      QSubjectString,
      QScoreString,
      sort,
      sortMethod
    })

    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
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
          disabled={!(name && subject && score)}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>

      <QuerySection>
        <QueryTypes>
          <QueryRow>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={QName}
                  onChange={handleChange(setQName)}
                ><div style={ {'fontSize':'1.3em','width':'100px','margin':'0 auto','textAlign':'center','lineHeight':'100px'} } > Name </div>
                  <FormControlLabel
                    value='Y'
                    control={<Radio color="primary" />}
                    label='Y'
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color="primary" />}
                    label='N'
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query name..."
              value={QNameString}
              onChange={handleChange(setQNameString)}
              style={{ flex: 1 }}
            />
          </QueryRow>

          <QueryRow>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={QSubject}
                  onChange={handleChange(setQSubject)}
                ><div style={ {'fontSize':'1.3em','width':'100px','margin':'0 auto','textAlign':'center','lineHeight':'100px'} } > Subject </div>
                  <FormControlLabel
                    value='Y'
                    control={<Radio color="primary" />}
                    label='Y'
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color="primary" />}
                    label='N'
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query subject..."
              value={QSubjectString}
              onChange={handleChange(setQSubjectString)}
              style={{ flex: 1 }}
            />
          </QueryRow>

          <QueryRow>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={QScore}
                  onChange={handleChange(setQScore)}
                ><div style={ {'fontSize':'1.3em','width':'100px','margin':'0 auto','textAlign':'center','lineHeight':'100px'} } > Score </div>
                  <FormControlLabel
                    value='Y'
                    control={<Radio color="primary" />}
                    label='Y'
                  />
                  <FormControlLabel
                    value='N'
                    control={<Radio color="primary" />}
                    label='N'
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Query score..."
              value={QScoreString}
              onChange={handleChange(setQScoreString)}
              style={{ flex: 1 }}
            />
          </QueryRow>
        </QueryTypes>

        <Button
          size="medium"
          aligh="center"
          style={{'margin':'0px auto'}}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={(
            ((QName==='Y')&&!QNameString) || 
            ((QSubject==='Y')&&!QSubjectString) || 
            ((QScore==='Y')&&!QScoreString)) ||
            (QName==='N'&&QSubject==='N'&&QScore==='N')
          }
          onClick={handleQuery}
        >
          Query
        </Button>
      </QuerySection>

      <SortRow>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={sort}
              onChange={handleChange(setSort)}
            ><div style={ {'fontSize':'0.8em','width':'120px','margin':'0 auto','textAlign':'center','lineHeight':'50px'} } > sort by score </div>
              <FormControlLabel
                value='Y'
                control={<Radio color="default" size="small" />}
                label='Y'
              />
              <FormControlLabel
                value='N'
                control={<Radio color="default" size="small" />}
                label='N'
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
      </SortRow>
      <SortRow style={{'rightMargin':'100px'}}>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={sortMethod}
              onChange={handleChange(setSortMethod)}
            ><div style={ {'fontSize':'0.8em','width':'200px','margin':'10px','textAlign':'right','lineHeight':'25px'} } > higher or lower first: </div>
              <FormControlLabel
                value='H'
                control={<Radio color="default" size="small" />}
                label='H'
              />
              <FormControlLabel
                value='L'
                control={<Radio color="default" size="small" />}
                label='L'
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
      </SortRow>
      <br></br>
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

