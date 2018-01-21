'use strict';
import { Provider } from 'react-redux'
var React = require('react');
var expect = require('expect');
import { AppContainer } from 'react-hot-loader';
const middlewares = [thunk]
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk'

import ConnectedTable, { Table } from '../app/common/Table';

import createMemoryHistory from 'history/createMemoryHistory'
import configureMockStore from 'redux-mock-store'

// setup file
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore(middlewares);
const store = mockStore({config: {}});

describe('TABLE COMPONENT #', function () {

    it('Renders', () => {
        const wrapper = mount(<Table items={[]} data={{}} handleClick={function(){}} columns={[]}/>)
        expect(wrapper).toBeTruthy();
    });

    it('Functional Test - Simple data set (2 cols X 3 rows)', () => {
        const wrapper = mount(<Table
        items={[1,2,3]}
                    data={{1:{id: 1, fullName:"Daniel"},2:{id: 2, fullName:"Jim"},3:{id: 3, fullName:"Greg"}}} handleClick={function(){}}
                    columns={[{id: "id", title: "Student ID", itemClass: "middle"},
                    {id: "fullName",title: "Full Name", itemClass: "middle"},]}/>);

        expect(wrapper.find("th").length).toEqual(2);
        expect(wrapper.find("tr").length).toEqual(4);
    });

    it('Functional Test - Simple data set (2 cols X 3 rows) Striped', () => {
        const wrapper = mount(<Table striped={true}
            items={[1,2,3]}
            data={{1:{id: 1, fullName:"Daniel"},2:{id: 2, fullName:"Jim"},3:{id: 3, fullName:"Greg"}}} handleClick={function(){}}
            columns={[{id: "id", title: "Student ID", itemClass: "middle"},
            {id: "fullName",title: "Full Name", itemClass: "middle"},]}/>);

        expect(wrapper.find(".style-striped").length).toEqual(3);
    });


    it('Functional Test - Complicated data set / Simple Column definition Striped', () => {

        var data = `{"1":{"id":1,"fullname":"Ryan Grey","userId":1,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":100,"mark":100}},{"order":1,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":true,"completion":55,"mark":null}},{"order":2,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":true,"completion":27,"mark":10}}]},"2":{"id":2,"fullname":"Jacqueline Myers","userId":2,"questPaths":[{"order":0,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":true,"completion":75,"mark":null}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"3":{"id":3,"fullname":"Henry Bloggs","userId":3,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":85,"mark":15}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"4":{"id":4,"fullname":"Michael McManns","userId":4,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":67,"mark":80}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"5":{"id":5,"fullname":"Vanessa Riley","userId":5,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":100,"mark":100}},{"order":1,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":false,"completion":0,"mark":null}},{"order":2,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":true,"completion":40,"mark":65}}]}}`
        data = JSON.parse(data);
        const wrapper = mount(<Table striped={true}
        items={[1,2,3,4,5]}
        data={data} handleClick={function(){}}
        columns={[{id: "id", title: "Student ID", itemClass: "middle"},
        {id: "fullname",title: "Full Name", itemClass: "middle"}]}/>);

        expect(wrapper.find("th").length).toEqual(2);
        expect(wrapper.find("tr").length).toEqual(6);
        expect(wrapper.find(".style-striped").length).toEqual(5);
    });

    it('Functional Test - Complicated data set / Complicated Column definition Striped', () => {

        let columnsSpec = [{id: "id", title: "Student ID", itemClass: "middle", rowSpan: "questPaths"},
            {id: "fullname",title: "Full Name", itemClass: "middle", rowSpan: "questPaths"},
            {id: "questPaths",title: "Quest Name", render: function(){}},
            { id: "id", title: "Quest Submitted?", itemClass: "middle",headerClass: "center", render: function() {}},
            { id: "id", title: "Quest Completion", itemClass: "middle center",headerClass: "center", render:  function() {}},
            { id: "id", title: "Quest Mark", itemClass: "middle", headerClass: "center", render:  function() {}},
            { id: "id", title: "Quest Active?", itemClass: "middle", headerClass: "center", render:  function() {}}];

        var data = `{"1":{"id":1,"fullname":"Ryan Grey","userId":1,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":100,"mark":100}},{"order":1,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":true,"completion":55,"mark":null}},{"order":2,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":true,"completion":27,"mark":10}}]},"2":{"id":2,"fullname":"Jacqueline Myers","userId":2,"questPaths":[{"order":0,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":true,"completion":75,"mark":null}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"3":{"id":3,"fullname":"Henry Bloggs","userId":3,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":85,"mark":15}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"4":{"id":4,"fullname":"Michael McManns","userId":4,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":67,"mark":80}},{"order":1,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":false,"completion":0,"mark":null}}]},"5":{"id":5,"fullname":"Vanessa Riley","userId":5,"questPaths":[{"order":0,"quest":{"id":1,"name":"Curiosity - The Space Rover"},"mark":{"submitted":true,"completion":100,"mark":100}},{"order":1,"quest":{"id":2,"name":"The 4 Hour Work Week","isActive":false},"mark":{"submitted":false,"completion":0,"mark":null}},{"order":2,"quest":{"id":3,"name":"Let's Learn about Economics"},"mark":{"submitted":true,"completion":40,"mark":65}}]}}`
        data = JSON.parse(data);
        const wrapper = mount(<Table striped={true}
        items={[1,2,3,4,5]}
        data={data} handleClick={function(){}}
        columns={columnsSpec}/>);

        expect(wrapper.find("th").length).toEqual(7);
        expect(wrapper.find("tr").length).toEqual(13);
        expect(wrapper.find(".style-striped").length).toEqual(4);
    });


});
