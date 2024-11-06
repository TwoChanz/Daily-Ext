import React from 'react';

const CalendarWidget: React.FC = () => {
    const today = new Date();
    const date = today.toDateString();

    return (
        <div className="calendar-widget">
            <h3>Today's Date</h3>
            <p>{date}</p>
        </div>
    );
};

export default CalendarWidget;
