import React, { Component } from 'react'
import { Table, Button } from 'antd';


//商品管理
export default class Goods extends Component {
    render() {

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
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <>{tags}</>
                    /*  <>
                       {tags.map(tag => {
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
                title: '操作',
                key: 'action',
                render: (text, record) => (
                <>
                    <Button type="primary" >
                        修改
                    </Button>
                    <Button type="primary" style={{marginLeft:'20px',background:'red',border:'none'}}>
                        删除
                    </Button>
                </>
                )
            },
        ];

        const data = [    //数据
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
            {
                key: 4,
                name: '衣服',
                age: 50,
                address: '广东省广州市天河区汇通产园',
                tags: '质量超好'
            },
            {
                key:5,
                name:'裤子',
                age:2,
                address:'广西壮族自治区南宁市青乡区桂柳路',
                tags:'广西产裤子就是耐穿'
            }
        ];

        return (
            <div className='goods'>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}
