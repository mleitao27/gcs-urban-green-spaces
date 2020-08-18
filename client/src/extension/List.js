import React from 'react';

const List = props => {

    return (
        props.list.map(item => {
            return (
                <props.item
                    key={item._id}
                    email={props.email}
                    onLogout={props.onLogout}
                    item={item}
                    props={props}
                />
            );
        })
    );
};

export default List;