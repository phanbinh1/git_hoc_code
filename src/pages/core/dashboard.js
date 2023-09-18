import React, { Fragment } from 'react';
import { CommonCalendar } from '../../components/common';
import { GiayChungNhanChart, CoSoChart } from "./../../components/core/home/chart"

const Dashboard = () => {

    return <Fragment>
        <div style={{ padding: 20, background: "#f5f5f5", height: "100%" }}>
            {/* <div className="form-group m-l-10 m-r-10" >
                <div className="row">
                    <div className="col-md-3 m-b-10">
                        <div className="chart-item chart-item-primary"></div>
                    </div>
                    <div className="col-md-3 m-b-10">
                        <div className="chart-item chart-item-success"></div>
                    </div>
                    <div className="col-md-3 m-b-10">
                        <div className="chart-item chart-item-danger"></div>
                    </div>
                    <div className="col-md-3 m-b-10">
                        <div className="chart-item chart-item-warning"></div>
                    </div>
                </div>
            </div> */}
            <div className="form-group m-l-10 m-r-10" >
                <div className="row">
                    <div className="col-md-4 m-b-10">
                        <CoSoChart />
                    </div>
                    <div className="col-md-8 m-b-10">
                        <GiayChungNhanChart />
                    </div>
                </div>
            </div>
            <div className="form-group m-l-10 m-r-10" >
                <div className="row">
                    <div className="col-md-12 m-b-10">
                        <CommonCalendar />
                    </div>

                </div>
            </div>
            {/* <div className="form-group m-l-10 m-r-10" >
                <div className="row">
                    <div className="col-md-12 m-b-10">
                        <ThanhKiemTraChart />
                    </div>
                </div>
            </div> */}
        </div>
    </Fragment>
}

export default Dashboard;