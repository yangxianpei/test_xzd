import React from "react";
import styles from "./index.less";
import { definePage, BaseComponent } from "ng-lib-tsx";

/**
 * page组件
 */
export default definePage(class extends BaseComponent {
  /**
   * 组件mount钩子函数，可以获取组件内部相关实例
   */
  componentDidMount(): void {
    console.log(this.props)
  }

  render() {
    return (
      <div className={styles.title}>
        ngreact Home
      </div>
    );
  }
});
