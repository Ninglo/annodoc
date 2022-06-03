import { Breadcrumb, Layout, Menu } from "@arco-design/web-react";
import { FC } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom"
import { routes } from "./router";
const { Header, Sider, Footer, Content } = Layout
const MenuItem = Menu.Item
const BreadcrumbItem = Breadcrumb.Item;

const Icon = () => <svg style={{ paddingRight: 4 }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1289" width="24" height="24"><path d="M482.728585 789.528976L860.55961 411.598049c1.698341-1.698341 2.497561-3.996098 2.297756-6.293854l-25.475122-301.105951c-0.699317-7.79239-6.793366-13.886439-14.585756-14.585756L521.690537 64.237268c-2.297756-0.199805-4.695415 0.599415-6.293854 2.297756L137.565659 444.366049c-3.096976 3.096976-3.096976 8.192 0 11.288975l333.873951 333.873952c3.096976 3.196878 8.192 3.196878 11.288975 0z m62.538927-651.064196l224.380878 18.981464 18.981464 224.380878L477.034146 693.322927 233.671805 450.060488l311.595707-311.595708z m60.100308 186.044317a47.953171 47.953171 0 1 0 67.813776-67.816773 47.953171 47.953171 0 1 0-67.813776 67.816773zM888.832 539.273366l-39.561366-39.461464c-3.096976-3.096976-8.192-3.096976-11.288975 0l-361.64683 360.947513-237.368195-236.768781c-3.096976-3.096976-8.192-3.096976-11.288975 0l-39.561366 39.461464c-3.096976 3.096976-3.096976 8.192 0 11.288975l242.962731 242.563122 39.561366 39.461464c3.096976 3.096976 8.192 3.096976 11.288976 0l406.902634-406.203318c3.096976-3.096976 3.096976-8.192 0-11.288975z" p-id="1290" fill="#165dff"></path></svg>
export const BaseLayout: FC = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    return <Layout className="base-layout">
        <Header className="base-header">
            <div className="base-header-left" onClick={() => navigate('/')}>
                <Icon />
                Annodoc
            </div>
            <div className="base-header-right">
                你好, 酒嘉年
            </div>
        </Header>
        <Layout>
            <Sider className="base-sider">
                <Menu selectedKeys={[pathname]}>
                    {routes.filter(({ show }) => show).map(({ path, name }) => <MenuItem key={path} onClick={() => navigate(path)}>{name}</MenuItem>)}
                </Menu>
            </Sider>
            <Layout>
                <Content className="base-content">
                    <Breadcrumb>
                        {/* <BreadcrumbItem><Link to="/">首页</Link></BreadcrumbItem> */}
                        {routes.filter(({ path }) => pathname.includes(path)).map(({ path, name }) => <BreadcrumbItem><Link to={path}>{name}</Link></BreadcrumbItem>)}
                    </Breadcrumb>
                    <Routes>
                        {routes.map(({ path, element }) => <Route path={path} element={element} />)}
                    </Routes>
                </Content>
                <Footer className="base-footer">
                    Annodoc -- 一款基于 Web 技术栈的文本标注应用
                </Footer>
            </Layout>
        </Layout>
    </Layout>
}