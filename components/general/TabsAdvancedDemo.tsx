import { useState } from "react";

import type { StackProps, TabLayout, TabsTabProps } from "tamagui";

import { AnimatePresence, SizableText, Tabs, YStack } from "tamagui";
const demos = ["background", "underline"] as const;

const demosTitle: Record<(typeof demos)[number], string> = {
  background: "Background Indicator",

  underline: "Underline Indicator",
};

export const TabsAdvancedBackground = ({
  currentTab,
  setCurrentTab,
  data,
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  data: { label: string; value: string }[];
}) => {
  const [tabState, setTabState] = useState<{
    // currentTab: string;
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null;
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null;
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null;
  }>({
    activeAt: null,

    // currentTab: "tab1",

    intentAt: null,

    prevActiveAt: null,
  });
  //   const setCurrentTab = (currentTab: string) =>
  //     setTabState({ ...tabState, currentTab });

  const setIntentIndicator = (intentAt: TabLayout | null) =>
    setTabState({ ...tabState, intentAt });

  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt });

  const { activeAt, intentAt, prevActiveAt } = tabState;

  const handleOnInteraction: TabsTabProps["onInteraction"] = (type, layout) => {
    if (type === "select") {
      setActiveIndicator(layout);
    } else {
      setIntentIndicator(layout);
    }
  };
  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation="horizontal"
      padding={6}
      flexDirection="row"
      activationMode="manual"
      backgroundColor="$background"
      borderRadius={16}
      marginHorizontal="auto"
    >
      <YStack>
        <AnimatePresence>
          {intentAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              width={intentAt.width}
              height={intentAt.height}
              x={intentAt.x}
              y={intentAt.y}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeAt && (
            <TabsRovingIndicator
              borderRadius="$4"
              theme="active"
              width={activeAt.width}
              height={activeAt.height}
              x={activeAt.x}
              y={activeAt.y}
            />
          )}
        </AnimatePresence>
        <Tabs.List
          disablePassBorderRadius
          loop={false}
          aria-label="Manage your account"
          gap="$2"
          backgroundColor="transparent"
        >
          {/* <Tabs.Tab
            unstyled
            paddingVertical="$2"
            paddingHorizontal="$3"
            value="tab1"
            onInteraction={handleOnInteraction}
          >
            <SizableText>Profile</SizableText>
          </Tabs.Tab> */}
          {data.map((item, index) => {
            return (
              <Tabs.Tab
                unstyled
                paddingVertical="$2"
                paddingHorizontal="$3"
                value={item.value}
                onInteraction={handleOnInteraction}
                key={index}
              >
                <SizableText>{item.label}</SizableText>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </YStack>
    </Tabs>
  );
};

const TabsRovingIndicator = ({
  active,
  ...props
}: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: "$color8",
        opacity: 0.6,
      })}
      {...props}
    />
  );
};
