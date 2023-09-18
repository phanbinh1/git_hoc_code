import React, { Fragment } from "react";
import { Popover } from "antd";

export default {
    current: {
        version: "3.2.1",
        date: "29/03/2021",
        description: "- Cập nhật"
    },
    history: [
        {
            version: "3.1.9",
            date: "29/01/2021",
            description: "- Cập nhật"
        },
        {
            version: "3.1.8",
            date: "20/11/2020",
            description: <Fragment>
                <p>- Cập nhật qui trình thanh kiểm tra</p>
            </Fragment>
        },
        {
            version: "3.1.6",
            date: "07/11/2020",
            description: <Fragment>
                <p>- Cập nhật qui trình luân chuyển hồ sơ tự công bố!
                    <Popover content={<Fragment>
                        <div> - Hồ sơ không đạt sẽ chuyển lên đến Trưởng phòng Nghiệp vụ </div>
                        <div> - Trưởng phòng nghiệp vụ sẽ yêu cầu chuyên viên Văn phòng bổ sung hồ sơ</div>
                        <div> - Đồng thời hệ thống sẽ gửi thông báo đến chuyên viên Phòng Nghiệp vụ để tạo văn bản yêu cầu công dân bổ sung hồ sơ</div>
                    </Fragment>} trigger="click"> <i className="fa fa-question-circle-o c-pointer" /> </Popover>
                </p>
                <p> - Chỉnh sửa trình ký văn bản trên hệ thống văn bản điều hành!</p>
            </Fragment>
        },
        {
            version: "3.1.5",
            date: "20/10/2020",
            description: <Fragment>
                <p>- Mặc định hiển thị năm hiện tại cho hồ sơ tự công bố, Cho phép lọc theo năm!</p>
                <p>- Nâng cấp qui trình luân chuyển hồ sơ tự công bố!</p>
            </Fragment>
        },
        {
            version: "3.1.4",
            date: "14/10/2020",
            description: <Fragment>
                <p>- Cho phép lọc theo Nhóm,phân nhóm, NK trong thống kê báo cáo hồ sơ tự công bố!</p>
                <p>- Chỉnh sửa hồ Tìm kiếm theo ngày tiếp nhận, thời điểm tự công bố trong hồ sơ tự công bố!</p>
            </Fragment>
        },
        {
            version: "3.1.3",
            date: "13/10/2020",
            description: <Fragment>
                <p>- Cập nhật trạng thái lọc cho hồ sơ tự công bố</p>
                <p>- Nhận thông báo công việc</p>
            </Fragment>
        }
    ]
}