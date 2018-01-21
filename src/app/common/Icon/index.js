import React from 'react';

export const Icon = (props) => {
    const { value, type } = props;

    if (type == "boolean") {
        return(
            <div className="center">
                <p className={((typeof value != "undefined") && (value !== true)) ? "glyphicon glyphicon-remove-circle":"glyphicon glyphicon-ok-circle"}></p>
            </div>
        );
    } else {
        return null;
    }
};

export default Icon;


