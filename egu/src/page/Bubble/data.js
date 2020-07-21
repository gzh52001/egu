/*  气泡组件数据  */

import React from 'react'
import { HomeOutlined, AppstoreOutlined, UserOutlined, ShoppingCartOutlined, ShopOutlined} from '@ant-design/icons';

const bubbleList= [{
  id: 1,
  title: '首页',
  path: '/home',
  icon: <HomeOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
},
{
  id: 2,
  title: '分类',
  path: '/category',
  icon: <AppstoreOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
},
{
  id: 3,
  title: '宅配',
  path: '/mine',
  icon: <ShopOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
},
{
  id: 4,
  title: '购物车',
  path: '/cart',
  icon: <ShoppingCartOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
},
{
  id: 5,
  title: '我的',
  path: '/mine',
  icon: <UserOutlined style={{ fontSize: '13px', marginRight: '6px' }} />
}
]
export default bubbleList;