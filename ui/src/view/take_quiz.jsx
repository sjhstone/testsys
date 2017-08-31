import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import update from 'immutability-helper';

import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Label from 'grommet/components/Label';
import FormField from 'grommet/components/FormField';
import RadioButton from 'grommet/components/RadioButton';
import Spinning from 'grommet/components/icons/Spinning';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';



import API_ROOT from '../var/api_root';

import Columns from 'grommet/components/Columns';



const QuizInfoHeader = (props) => (
    <Section colorIndex='neutral-1' justify='center' align='center'>
        <Columns size='large'
            masonry={false}
            maxCount={2}>
            <Box pad='small'>
                <Heading tag='h2' strong={true}>
                    {props.title}
                </Heading>
                <Paragraph>
                    {props.description}
                </Paragraph>
                {props.s_time.toLocaleDateString("en-US")} ~ {props.e_time.toLocaleDateString("en-US")}
            </Box>
            <Box pad='small'>
                <Tiles fill={true}>
                    <Tile>
                        <Value value={props.p_count} label='总共' units='题'/>
                    </Tile>
                    <Tile>
                        <Value value={props.a_time} label='限时' units='分钟'/>
                    </Tile>
                    
                </Tiles>
            </Box>
        </Columns>
    </Section>
);

export default class QuizTakeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz_id: this.props.match.params.quiz_id,
            quiz: {},
            problems: [],
            answers: new Map(),
            answer_sheet: ''
        };
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    componentDidMount() {
        fetch(API_ROOT+'quiz/'+this.state.quiz_id, {method: 'GET', headers: {
            "Accept": "Application/json"
        }}).then( r => r.json() ).then( j => {
            console.log(j);
            this.setState({quiz: j});
        });

        fetch(API_ROOT+'quiz/'+this.state.quiz_id+'/problems/', {method: 'GET', headers: {
            "Accept": "Application/json"
        }}).then( r => r.json() ).then( j => {
            this.setState({problems: j});
        });
    }

    handleRadioChange = (e) => {
        const pid = e.target.dataset.pId;
        const ans = e.target.value;
        this.setState( (prevState, props) => {
            return {answers: prevState.answers.set(pid, ans)};
        });
    };

    handleSubmission = (e) => {
        let answer_collection = Array.from(
            this.state.answers.entries()
        ).map( kvp => {
            let o = {};
            o["problem"] = parseInt(kvp[0])
            o["choice"] = kvp[1];
            return o;
        });

        let anssh = {
            quiz_id: parseInt(this.state.quiz_id),
            answers: answer_collection
        }

        this.setState({answer_sheet: JSON.stringify(anssh, null, 2)});
    }
    

    render() {
        if (this.state.problems.length > 0) {
            let prob = this.state.problems.map( p => {

                function gen_checkboxes(problem_type, comp) {
                    // console.log(problem_type);
                    if (problem_type == '单选题') {
                        let choices = p.choices.split(/\r\n?|\ns/);
                        return choices.map( c => {
                            let choiceid = `problem-${p.id}-choice-${c[0]}`;
                            return (
                                <RadioButton type='radio' key={choiceid}
                                id={choiceid}
                                name={choiceid}
                                data-p-id={p.id}
                                label={c}
                                value={c[0]}
                                checked={comp.state.answers.get(p.id.toString()) === c[0]}
                                onChange={comp.handleRadioChange} />
                            )
                        });
                    } else {
                        let choice_t_id = `problem-${p.id}-choice-true`;
                        let choice_f_id = `problem-${p.id}-choice-false`;
                        return ([
                            <RadioButton type='radio' key={choice_t_id} id={choice_t_id} name={choice_t_id} data-p-id={p.id}
                                label='正确' value='T'
                                checked={comp.state.answers.get(p.id.toString()) === 'T'}
                                onChange={comp.handleRadioChange} />,
                            <RadioButton type='radio' key={choice_f_id} id={choice_f_id} name={choice_f_id} data-p-id={p.id}
                                label='错误' value='F'
                                checked={comp.state.answers.get(p.id.toString()) === 'F'}
                                onChange={comp.handleRadioChange} />
                        ]);
                    }
                }
                return (
                    <Section key={'prob'+p.id} full='horizontal' size='full' basis='full'>
                        <Label size='small'>{p.p_category} / {p.p_type}</Label>
                        <Paragraph size='large'>
                            {p.content}
                        </Paragraph>
                        <FormField>
                            {gen_checkboxes(p.p_type, this)}
                        </FormField>
                    </Section>
                );
            })
            return (
                <div>
                    <QuizInfoHeader
                      title={this.state.quiz.title}
                      description={this.state.quiz.description}
                      a_time={this.state.quiz.allowed_time}
                      p_count={this.state.problems.length}
                      s_time={new Date(this.state.quiz.start_time)}
                      e_time={new Date(this.state.quiz.end_time)} />
                    {prob}
                    <Button
                        label='Preview'
                        onClick={this.handleSubmission} />
                    <pre>
                        {this.state.answer_sheet}
                    </pre>
                </div>
            )
        } else {
            return(
                <div><Spinning size='xlarge'/><br/>Loading</div>
            )
        }
    }
}