import React, { useState } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  Heading,
  Box,
  HStack,
  Spacer,
  Flex,
  Badge,
  NativeBaseProvider,
  VStack,
  Skeleton,
  Modal,
} from "native-base";
import { XMLParser } from "fast-xml-parser";
import { unescape } from "he";

var title, content, date;
const Notice = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    title: "",
    date: "",
    content: "",
  });
  const [showModal, setShowModal] = useState(false);

  try {
    const xhr = new XMLHttpRequest();
    var url = `http://openapi.seoul.go.kr:8088/6848434b6d6273653830754b6d6345/xml/VwNotice/50/100`; /* URL */
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (this.readyState == xhr.DONE) {
        if (xhr.status == 200 || xhr.status == 201) {
          let parser = new XMLParser();
          let xmlDoc = parser.parse(this.responseText, "text/xml");
          xmlDoc.VwNotice.row.forEach((item) => {
            title = `${item.N_TITLE} `;
            content = `${item.N_CONTENTS} `;
            date = `${item.REG_DATE} `;

            // alert(MName, AName, GuName, TypeName);
          });
          data = xmlDoc.VwNotice.row;
          data.sort(function (a, b) {
            return b.N_SEQ - a.N_SEQ;
          });

          setLoading(false);
        }
      }
    };
    xhr.send("");
  } catch (error) {
    console.log(error);
  }
  const popUp = (mTitle, mDate, mContent) => {
    let eTitle = "",
      eContent = " ";
    eTitle = mTitle;
    eContent = mContent;
    eTitle = unescape(eTitle);
    eContent = unescape(mContent);
    setState({
      title: eTitle,
      date: mDate,
      content: eContent,
    });
    setShowModal(true);
  };

  return (
    <NativeBaseProvider>
      <ScrollView w={["400", "300"]} h="80" centerContent="true" mt={15}>
        <VStack flex={1}>
          <VStack
            w="96%"
            maxW="600"
            ml="2"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            {loading ? (
              <>
                <Box mt="2" mb="-2">
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="primary.500"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box mb="-2">
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="primary.500"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box mb="-2">
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="primary.500"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    space={12}
                    shadow={3}
                    borderWidth="3"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5 ">
                      <Skeleton
                        startColor="primary.500"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>
              </>
            ) : null}
          </VStack>
          {!loading ? (
            <>
              {data.map((seq, i) => (
                <Box alignItems="center" key={i} padding="2">
                  <Pressable
                    onPress={() =>
                      popUp(
                        `${seq.N_TITLE}`,
                        `${seq.REG_DATE}`,
                        `${seq.N_CONTENTS}`
                      )
                    }
                    minW="96"
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Box
                          bg={
                            isPressed
                              ? "coolGray.200"
                              : isHovered
                              ? "coolGray.200"
                              : "coolGray.100"
                          }
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.96 : 1,
                              },
                            ],
                          }}
                          p="5"
                          rounded="8"
                          shadow={3}
                          borderWidth="1"
                          borderColor="coolGray.300"
                        >
                          <HStack alignItems="center">
                            <Badge
                              bg="primary.500"
                              _text={{
                                color: "white",
                              }}
                              variant="solid"
                              rounded="4"
                            >
                              물가정보
                            </Badge>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                              {`${seq.REG_DATE}`}
                            </Text>
                          </HStack>
                          <Text
                            color="coolGray.800"
                            mt="3"
                            fontWeight="medium"
                            fontSize="xl"
                            isTruncated
                          >
                            {unescape(`${seq.N_TITLE}`)}
                          </Text>
                          <Text
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                            isTruncated
                          >
                            {unescape(`${seq.N_CONTENTS}`)}
                          </Text>
                          <Flex>
                            {isFocused ? (
                              <Text
                                mt="2"
                                fontSize={12}
                                fontWeight="medium"
                                textDecorationLine="underline"
                                color="darkBlue.600"
                                alignSelf="flex-start"
                              >
                                더보기
                              </Text>
                            ) : (
                              <Text
                                mt="2"
                                fontSize={12}
                                fontWeight="medium"
                                color="darkBlue.600"
                              >
                                더보기
                              </Text>
                            )}
                          </Flex>
                          <Modal
                            _backdrop={true}
                            bgColor="blueGray.200"
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                          >
                            <Modal.Content w="400" h="600">
                              <Modal.CloseButton />
                              <Heading fontSize="xl"> </Heading>
                              <Heading padding="3">{state.title}</Heading>
                              <Modal.Body>
                                <Text color="light.600">
                                  작성일 : {state.date}
                                </Text>
                                <Text> </Text>
                                <Text fontSize="md">{state.content}</Text>
                              </Modal.Body>
                            </Modal.Content>
                          </Modal>
                        </Box>
                      );
                    }}
                  </Pressable>
                </Box>
              ))}
            </>
          ) : null}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Notice;
