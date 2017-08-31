import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, History} from 'react-router-dom';

import moment from 'moment';

import Card from 'grommet/components/Card';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Spinning from 'grommet/components/icons/Spinning';

import API_ROOT from '../var/api_root';

export default class QuizListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quizes: []
        };
    }

    componentWillMount() {
        this.setState({quizes: []});
    }
    
    componentDidMount() {        
        fetch(API_ROOT + 'quiz/', {method: 'GET', headers: {
            "Accept": "Application/json"
        }}).then( r => r.json() ).then( j => {
            console.log(j);
            this.setState({quizes: j});
        } );
    }

    render() {
        if (this.state.quizes.length > 0) {
            moment.updateLocale('en', {
                relativeTime : {
                    future: "还有%s",
                    past:   "%s前",
                    s  : '就几秒',
                    ss : '%d秒',
                    m:  "约一分钟",
                    mm: "%d分钟",
                    h:  "约一小时",
                    hh: "%d小时",
                    d:  "大约一天",
                    dd: "%d天",
                    M:  "约一个月",
                    MM: "%d 个月",
                    y:  "约一年",
                    yy: "%d年"
                }
            });
            let cardtiles = this.state.quizes.map( function (q) {
                return (
                    <Tile key={'tile_for_problem' + q.id.toString()}>
                        <Card heading={q.title}
                        label={moment(q.end_time).fromNow()}
                        description={q.description + '（至多可重考' + q.allowed_retake + '次，每场最长' + q.allowed_time + '分钟）'}
                        link={<Link to={'/take_quiz/'+q.id.toString()}>开始答题</Link>}
                        contentPad='small'
                        />
                    </Tile>
                );
            })
            return (
                <Tiles fill={true} selectable={true}>{cardtiles}</Tiles>
            );
        } else {
            return (
                <p>正在加载所有考试 ...</p>
            );
        }
    }
}

