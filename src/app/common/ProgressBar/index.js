import React from 'react';
import styles from './style.acss';

export const ProgressBar = (props) => {
    const { mark } = props;

    return(
        <div>
            <div>
                <p className={styles.parentWrapper}>{mark}%</p>
            </div>

            <div className={styles.parent}>
                <div className='progress-bar'
                    role='progressbar'
                    aria-valuenow={mark}
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{width:  mark + '%'}}>

                    <p className=''></p>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;


