import React from 'react';
import styles from './DataCollectorStatusIcon.module.scss';
import Icon from '@material-ui/core/Icon';

export const DataCollectorStatusIcon = ({status, icon}) => (
    <Icon className={styles['icon_' + status]}>{icon}</Icon>
);
