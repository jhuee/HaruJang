import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./screens/main_page";
import VwNews from "./screens/vw_news";
import VwNotice from "./screens/vw_notice";
import LowPlace from "./screens/lowest_place";
import CheckList from "./screens/check_list";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TabIcon = ({ name }) => {
  return <MaterialCommunityIcons name={name} size={24} color="white" />;
};

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#2A334C",
          borderTopColor: "#2A334C",
        },
        tabBarInactiveTintColor: "#202637",
        tabBarActiveTintColor: "#dbeafe",
      })}
    >
      <Tab.Screen
        name="최저가 찾기"
        component={LowPlace}
        options={{
          tabBarLabel: "최저가 찾기",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="물가소식"
        component={VwNotice}
        options={{
          tabBarLabel: "물가소식",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="trending-up"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarLabel: "홈",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="할인행사"
        component={VwNews}
        options={{
          tabBarLabel: "할인행사",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="체크리스트"
        component={CheckList}
        options={{
          tabBarLabel: "체크리스트",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
