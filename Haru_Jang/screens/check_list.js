import React from "react";
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  useToast,
  NativeBaseProvider,
  ScrollView,

} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";

const CheckList = () => {
  const instState = [];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = React.useState("");
  const toast = useToast();

  const addItem = (title) => {
    if (title === "") {
      toast.show({
        title: "Please Enter Text",
        status: "warning",
      });
      console.log(toast);
      return;
    }

    setList((prevList) => {
      return [
        ...prevList,
        {
          title: title,
          isCompleted: false,
        },
      ];
    });
  };

  const handleDelete = (index) => {
    setList((prevList) => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
  };

  const handleStatusChange = (index) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[index].isCompleted = !newList[index].isCompleted;
      return newList;
    });
  };

  return (
    <NativeBaseProvider>
      <ScrollView scrollEnabled={false} backgroundColor="white">
        <Box maxW="350" w="100%" ml={10} mr={20}>
          <Heading mb="10" size="lg" pd={15} mt={20}>
            장보기 체크리스트🛒✔️
          </Heading>
          <VStack space={4}>
            <HStack space={2}>
              <Input
                fontSize="m"
                size="m"
                h="10"
                backgroundColor="light.100"
                focusOutlineColor="light.400"
                flex={1}
                onChangeText={(v) => setInputValue(v)}
                value={inputValue}
                placeholder="입력"
              />
              <IconButton
                borderRadius="sm"
                variant="solid"
                bgColor="info.600"
                icon={
                  <Icon
                    as={Feather}
                    name="plus"
                    size="sm"
                    color="warmGray.50"
                  />
                }
                onPress={() => {
                  addItem(inputValue);
                  setInputValue("");
                }}
              />
            </HStack>
            <VStack space={2}>
              {list.map((item, itemI) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={item.title + itemI.toString()}
                >
                  <Checkbox
                    isChecked={item.isCompleted}
                    onChange={() => handleStatusChange(itemI)}
                    value={item.title}
                    accessibilityLabel={item.title}
                  ></Checkbox>
                  <Text
                    width="100%"
                    flexShrink={1}
                    textAlign="left"
                    mx="2"
                    strikeThrough={item.isCompleted}
                    _light={{
                      color: item.isCompleted ? "gray.400" : "coolGray.800",
                    }}
                    _dark={{
                      color: item.isCompleted ? "gray.400" : "coolGray.50",
                    }}
                    onPress={() => handleStatusChange(itemI)}
                  >
                    {item.title}
                  </Text>
                  <IconButton
                    size="md"
                    colorScheme="trueGray"
                    icon={
                      <Icon as={AntDesign} name="delete" color="trueGray.400" />
                    }
                    onPress={() => handleDelete(itemI)}
                  />
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};


export default CheckList;
