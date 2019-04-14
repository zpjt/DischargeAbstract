
declare module 'velocity-react' {

  type BuiltinAnimation
    = 'slideUp'
    | 'slideDown'
    | 'fadeIn'
    | 'fadeOut';

  type PreRegisteredAnimation 
    = 'callout.bounce'
    | 'callout.shake'
    | 'callout.flash'
    | 'callout.pulse'
    | 'callout.swing'
    | 'callout.tada'
    | 'transition.fadeIn'
    | 'transition.fadeOut'
    | 'transition.flipXIn'
    | 'transition.flipXOut'
    | 'transition.flipYIn'
    | 'transition.flipYOut'
    | 'transition.flipBounceXIn'
    | 'transition.flipBounceXOut'
    | 'transition.flipBounceYIn'
    | 'transition.flipBounceYOut'
    | 'transition.swoopIn'
    | 'transition.swoopOut'
    | 'transition.whirlIn'
    | 'transition.whilrOut'
    | 'transition.shrinkIn'
    | 'transition.shrinkOut'
    | 'transition.expandIn'
    | 'transition.expandOut'
    | 'transition.bounceIn'
    | 'transition.bounceOut'
    | 'transition.bounceUpIn'
    | 'transition.bounceUpOut'
    | 'transition.bounceDownIn'
    | 'transition.bounceDownOut'
    | 'transition.bounceLeftIn'
    | 'transition.bounceLeftOut'
    | 'transition.bounceRightIn'
    | 'transition.bounceRightOut'
    | 'transition.slideUpIn'
    | 'transition.slideUpOut'
    | 'transition.slideDownIn'
    | 'transition.slideDownOut'
    | 'transition.slideLeftIn'
    | 'transition.slideLeftOut'
    | 'transition.slideRightIn'
    | 'transition.slideRightOut'
    | 'transition.slideUpBigIn'
    | 'transition.slideUpBigOut'
    | 'transition.slideDownBigIn'
    | 'transition.slideDownBigOut'
    | 'transition.slideLeftBigIn'
    | 'transition.slideLeftBigOut'
    | 'transition.slideRightBigIn'
    | 'transition.slideRightBigOut'
    | 'transition.perspectiveUpIn'
    | 'transition.perspectiveUpOut'
    | 'transition.perspectiveDownIn'
    | 'transition.perspectiveDownOut'
    | 'transition.perspectiveLeftIn'
    | 'transition.perspectiveLeftOut'
    | 'transition.perspectiveRightIn'
    | 'transition.perspectiveRightOut';

  export type PredefinedAnimation = BuiltinAnimation | PreRegisteredAnimation;

  export type Animation = Object | PredefinedAnimation;

  export interface AnimationSetup {
    animation: Animation,
    style?: React.CSSProperties,
    duration?: number,
    easing?: string|number[],
    stagger?: number,
    drag?: boolean,
    complete?: (elements: NodeListOf<HTMLElement>) => void,
  }

  export interface VelocityComponentProps extends React.HTMLProps<VelocityComponent>, AnimationSetup {

  }

  export class VelocityComponent extends React.Component<VelocityComponentProps, any> { }


  export interface VelocityTransitionGroupProps extends React.HTMLProps<VelocityTransitionGroup> {
    enter?: AnimationSetup,
    leave?: AnimationSetup,
    runOnMount?: boolean,
  }

  export class VelocityTransitionGroup extends React.Component<VelocityTransitionGroupProps, any> {

    static disabledForTest: boolean;

  }
}
