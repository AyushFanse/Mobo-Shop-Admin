import React from 'react';
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Demo 1</span>
            <span className="widgetSmUserTitle">demo1@gmail.com</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Demo 2</span>
            <span className="widgetSmUserTitle">demo2@gmail.com</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Demo 3</span>
            <span className="widgetSmUserTitle">demo3@gmail.com</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Demo 4</span>
            <span className="widgetSmUserTitle">demo4@gmail.com</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Demo 5</span>
            <span className="widgetSmUserTitle">demo5@gmail.com</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
