import React from 'react'
import WebLayout from '../../layouts/WebLayout/index'
import { Route, Router, Routes } from 'react-router-dom'
import { webRouterList } from './webRouterList'

const WebRoutes = () => {
    return (
        <>
            <WebLayout>
                <Routes>
                    {
                        webRouterList.map((obj, i) => {
                            return (
                                <Route key={i} path={obj.path} Component={obj.Component} />
                            )
                        })
                    }
                </Routes>
            </WebLayout>
        </>
    );
}

export default WebRoutes