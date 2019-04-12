import * as React from "react" ;

export const withDefaultProps = <
  P extends object,
  DP extends Partial<P> = Partial<P>
>(
  defaultProps: DP,
  Cmp: React.ComponentType<P>,
) => {
  // 提取出必须的属性
  type RequiredProps =  Pick<P, Exclude<keyof P, keyof DP>>
  // 重新创建我们的属性定义，通过一个相交类型，将所有的原始属性标记成可选的，必选的属性标记成可选的
  type Props = Partial<DP> & Required<RequiredProps>;

  Cmp.defaultProps = defaultProps;

  // 返回重新的定义的属性类型组件，通过将原始组件的类型检查关闭，然后再设置正确的属性类型
  return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>;
};

