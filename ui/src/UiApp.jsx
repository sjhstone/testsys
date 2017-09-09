import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import HomeView from './view/home';
import QuizListView from './view/quiz_list';
import QuizTakeView from './view/quiz_take';

import '../node_modules/grommet-css'

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';

import HomeIcon from 'grommet/components/icons/base/Home';
import Anchor from 'grommet/components/Anchor';

import TITLE_STRING from './var/title_string';
import CUSTOMER from './var/customer';


const LinksToViews = () => (
    <Link to="/list_quiz">ListQuiz</Link>
);

const TitleArea = () => (
    <Box full='horizontal' direction='column' margin={  {top: 'large', bottom: 'medium'} }>
        <Box direction='row' basis='full'>
            <Anchor icon={<HomeIcon />} label='返回验安' href='https://saferlab.sjhstone.cn' />
        </Box>
        <Box direction='row' colorIndex='light-2' basis='full'>
            <Heading>
                {TITLE_STRING}
            </Heading>
        </Box>
    </Box>
);

const FooterArea = () => (
    <Footer justify='between' size='small'>
        <Box direction='row' margin={  {top: 'large', bottom: 'large'} }
            align='center'
            pad={{"between": "medium"}}>
            <Paragraph>
            使用单位：{CUSTOMER}
            </Paragraph>
            <br/>
            <Menu direction='row'
            size='small'
            dropAlign={ {right: "right"} }>
                <Anchor href='#'>
                    验安
                </Anchor>
                <Anchor href='#'>
                    上海科技大学设备与资产处
                </Anchor>
                <Anchor href='#'>
                    上海科技大学学生 GeekPie 社团
                </Anchor>
            </Menu>
        </Box>
    </Footer>
);

const EntryPoint  = () => (
    <App>
        <TitleArea/>
        <BrowserRouter>
            <div>
            <Route exact path="/" component={LinksToViews} />
            <Route path="/list_quiz" component={QuizListView} />
            <Route path="/take_quiz/:quiz_id" component={QuizTakeView} />
            </div>
        </BrowserRouter>
        <FooterArea/>
    </App>
);

export default EntryPoint;