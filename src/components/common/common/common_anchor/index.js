import React from "react";
import { Anchor } from "antd";
const CommonAnchor = () => {
    return <Anchor>
        <Anchor.Link href="#thong-tin-ke-hoach" title="Thông tin kế hoạch" />
        <Anchor.Link href="#kinh-phi" title="Kinh phí" />
        <Anchor.Link href="#pham-vi-thanh-tra" title="Phạm vi thanh tra" />
        <Anchor.Link href="#danh-sach-cuoc-thanh-tra" title="Danh sách cuộc thanh tra" />
        <Anchor.Link href="#quyet-dinh" title="Quyết định/Biên bản/Biểu mẫu khác" />
    </Anchor>
}

export default CommonAnchor;