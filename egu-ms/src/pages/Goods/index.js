import React, { Component } from 'react'
import { Table, Tag, Space, Button, Popconfirm } from 'antd';



//商品管理
export default class Goods extends Component {
    state = {
        dataSource: [   //行数据
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                business: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                business: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                business: ['cool', 'teacher'],
            },
            {
                key: '4',
                name: '衣服',
                age: 50,
                address: '广东省广州市天河区汇通产园',
                business: '质量超好'
            },
            {
                key: '5',
                name: '裤子',
                age: 2,
                address: '广西壮族自治区南宁市青乡区桂柳路',
                business: '广西产裤子就是耐穿'
            },
            {
                key: '11',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                business: ['nice', 'developer'],
            },
            {
                key: '21',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                business: ['loser'],
            },
            {
                key: '31',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                business: ['cool', 'teacher'],
            },
            {
                key: '41',
                name: '衣服',
                age: 50,
                address: '广东省广州市天河区汇通产园',
                business: '质量超好'
            },
            {
                key: '51',
                name: '裤子',
                age: 2,
                address: '广西壮族自治区南宁市青乡区桂柳路',
                business: '广西产裤子就是耐穿'
            },
            {
                key: '511',
                name: '裤子',
                age: 2,
                address: '广西壮族自治区南宁市青乡区桂柳路',
                business: '广西产裤子就是耐穿'
            },
        ],
        count: 2,
    };

    //删除操作的方法
    handleDelete = key => {     
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    render() {

        /* -------列数组------- */

        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',    //数据列表对应的列
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '数量',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '商家',
                key: 'business',
                dataIndex: 'business',
                render: business => (
                    <>{business}</>
                    /*  <>
                    {business.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                            </Tag>
                            );
                        })}
                        </> */
                ),
            },
            {
                title: '产地',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => this.state.dataSource.length >= 1 ? (
                    <>
                        <Button type="primary" style={{ background: 'orange', border: 'none' }}>
                            修改
                    </Button>
                        <Popconfirm title="确定要删除?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="primary" style={{ marginLeft: '20px', background: 'red', border: 'none' }}>
                                删除
                        </Button>
                        </Popconfirm>
                    </>
                ) : null,
            },
        ];

        const { dataSource } = this.state;

        return (
            <div className='goods'>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        )
    }
}