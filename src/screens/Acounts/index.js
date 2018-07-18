import Welcome from './Welcome';
import Signup from './Signup';
import Login from "./Login";
import { StackNavigator } from "react-navigation";
import { Easing, Animated} from 'react-native';

screenInterpolator = (sceneProps) => {
    const { position, layout, scene, index, scenes } = sceneProps
    const toIndex = index
    const thisSceneIndex = scene.index
    const height = layout.initHeight
    const width = layout.initWidth

    const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
    })
    const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
    })

    const slideFromRight = { transform: [{ translateX }] }
    const slideFromBottom = { transform: [{ translateY }] }
    const lastSceneIndex = scenes[scenes.length - 1].index
    if (lastSceneIndex - toIndex > 1) {
        if (scene.index === toIndex) return
        return slideFromBottom
    }
    return slideFromRight
}

const NavigationConfig = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const position = sceneProps.position;
            const scene = sceneProps.scene;
            const index = scene.index;
            const height = sceneProps.layout.initHeight;
            //return FadeTransition(index, position);
            return screenInterpolator(sceneProps);
        }
    }
}
export default AuthStack = StackNavigator(
    {
        Welcome: Welcome,
        Login: Login,
        Signup: Signup,
    },
    {
        initialRouteName: "Welcome",
        transitionConfig: NavigationConfig
    }
);
