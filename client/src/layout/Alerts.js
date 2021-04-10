import React, { useContext } from 'react';
import AlertContext from '../contexts/alert/alertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  return (
    <TransitionGroup>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <CSSTransition key={alert.id} timeout={500} classNames="item">
            <div className={`alert alert-${alert.type}`}>
              <i className="fas fa-info-circle" /> {alert.msg}
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
};

export default Alerts;
