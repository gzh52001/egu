import React, { Component } from 'react'
import { Table, Tag, Space, Button, Popconfirm, Modal } from 'antd';
import dataSource from './data'
import Modals from './Modal'


//商品管理
export default class Goods extends Component {
    state = {
        dataSource, //数据行渲染
    };

    //删除操作的方法
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key)});
    };

    render() {

        /* -------列数组------- */

        const columns = [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}` //使用render函数渲染列表序号
                
            },
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
               
            },
            {
                title: '产地',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => this.state.dataSource.length >= 1 ? (   //record: 当前渲染的数据
                    <>
                        {/* 给弹窗组件传参 */}
                        <Modals details={record}/>

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