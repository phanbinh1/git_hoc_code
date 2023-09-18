import React, { } from 'react';
import { Link, useLocation } from "react-router-dom";
import { List } from "antd";
import { Markup } from "interweave";
import { queryString } from '../../../constants/main';

const SearchResult = ({
    item
}) => {
    const location = useLocation();
    const qs = queryString.parse(location.search);

    const highlightKey = () => {
        const key = qs.q;
        const arrKey = key.split(" ");
        const string = item.description;
        const arrString = string.split(" ");
        const style = "style='color:green'";
        let res = "";
        let startNum = -1, endNum = -1, strBefore = "", strLast = "", strCenter = "", index = -1;
        arrString.map((char) => {
            if (arrKey.findIndex(item => item.toLowerCase() === char.toLowerCase()) !== -1) {
                res += `<b ${style}>${char}</b> `;
            }
            else if (arrKey.findIndex(item => char.toLowerCase().indexOf(item.toLowerCase()) !== -1) !== -1) {
                index = arrKey.findIndex(item => char.toLowerCase().indexOf(item.toLowerCase()) !== -1);
                startNum = char.toLowerCase().indexOf(arrKey[index].toLowerCase());
                endNum = arrKey[index].length;
                strBefore = char.substring(0, startNum);
                strLast = char.substring(endNum, char.length);
                strCenter = char.substring(startNum, endNum);
                res += `${strBefore}<b ${style}>${strCenter}</b>${strLast} `;
            }
            else {
                res += `${char} `;
            }
            return res;
        })
        return res;
    }

    return <React.Fragment>
        <List.Item className="search-item">
            <List.Item.Meta
                title={<Link className="search-title" to={item.href || ""}>
                    {item.title}
                </Link>}
                description={<React.Fragment>
                    <div className="search-link">
                        {item.href}
                    </div>
                    <div className="search-description">
                        <Markup content={highlightKey()} />
                    </div>
                </React.Fragment>}
            />
        </List.Item>
    </React.Fragment >;
}
export default SearchResult;