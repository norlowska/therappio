// @flow

import color from "color";
import { Platform, Dimensions, PixelRatio } from "react-native";
// import { Fonts } from "./fonts";

export const PLATFORM = {
  ANDROID: "android",
  IOS: "ios",
  MATERIAL: "material",
  WEB: "web"
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === PLATFORM.IOS &&
  (deviceHeight === 812 ||
    deviceWidth === 812 ||
    deviceHeight === 896 ||
    deviceWidth === 896);

export default {
  platformStyle,
  platform,

  // Accordion
  headerStyle: "#edebed",
  iconStyle: "#000",
  contentStyle: "#f5f4f5",
  expandedIconStyle: "#000",
  accordionBorderColor: "#d3d3d3",

  // ActionSheet
  elevation: 4,
  containerTouchableBackgroundColor: "rgba(0,0,0,0.4)",
  innerTouchableBackgroundColor: "#f7f7f7",
  listItemHeight: 50,
  listItemBorderColor: "transparent",
  marginHorizontal: -15,
  marginLeft: 14,
  marginTop: 15,
  minHeight: 56,
  padding: 15,
  touchableTextColor: "#757575",

  // Android
  androidRipple: true,
  androidRippleColor: "rgba(256, 256, 256, 0.3)",
  androidRippleColorDark: "rgba(0, 0, 0, 0.15)",
  buttonUppercaseAndroidText: true,

  // Badge
  badgeBg: "rgba(181,22,18,1)",
  badgeColor: "#fff",
  badgePadding: platform === PLATFORM.IOS ? 3 : 0,

  // Button
  buttonFontFamily: "Raleway-Regular",
  buttonDisabledBg: "#b5b5b5",
  buttonPadding: 6,
  get buttonPrimaryBg() {
    return this.brandPrimary;
  },
  get buttonPrimaryColor() {
    return this.inverseTextColor;
  },
  get buttonInfoBg() {
    return this.brandInfo;
  },
  get buttonInfoColor() {
    return this.inverseTextColor;
  },
  get buttonSuccessBg() {
    return this.brandSuccess;
  },
  get buttonSuccessColor() {
    return this.inverseTextColor;
  },
  get buttonDangerBg() {
    return this.brandDanger;
  },
  get buttonDangerColor() {
    return this.inverseTextColor;
  },
  get buttonWarningBg() {
    return this.brandWarning;
  },
  get buttonWarningColor() {
    return this.inverseTextColor;
  },
  get buttonTextSize() {
    return platform === PLATFORM.IOS
      ? this.fontSizeBase * 1.1
      : this.fontSizeBase - 1;
  },
  get buttonTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get buttonTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },
  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: "rgba(250,250,250,1)",
  cardBorderColor: "#ccc",
  cardBorderRadius: 5,
  cardItemPadding: platform === PLATFORM.IOS ? 10 : 12,

  // CheckBox
  CheckboxRadius: platform === PLATFORM.IOS ? 13 : 0,
  CheckboxBorderWidth: platform === PLATFORM.IOS ? 1 : 2,
  CheckboxPaddingLeft: platform === PLATFORM.IOS ? 4 : 2,
  CheckboxPaddingBottom: platform === PLATFORM.IOS ? 0 : 5,
  CheckboxIconSize: platform === PLATFORM.IOS ? 21 : 16,
  CheckboxIconMarginTop: platform === PLATFORM.IOS ? undefined : 1,
  CheckboxFontSize: platform === PLATFORM.IOS ? 23 / 0.9 : 17,
  checkboxBgColor: "rgba(34,105,179,1)",
  checkboxSize: 20,
  checkboxTickColor: "rgba(247,247,247,1)",
  checkboxDefaultColor: "transparent",

  // Color
  brandPrimary: "#438edb",
  brandInfo: "#3F57D3",
  brandSuccess: "#5cb85c",
  brandDanger: "#d9534f",
  brandWarning: "#f0ad4e",
  brandDark: "rgba(181,22,18,1)",
  brandLight: "rgba(255,255,255,1)",

  // Container
  containerBgColor: "#fff",

  // Date Picker
  datePickerTextColor: "#000",
  datePickerBg: "transparent",

  // FAB
  fabWidth: 56,

  // Font
  DefaultFontSize: 14,
  fontFamily: "Raleway-Regular",
  fontSizeBase: 15,
  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: 55,
  footerDefaultBg: platform === PLATFORM.IOS ? "#F8F8F8" : "#438edb",
  footerPaddingBottom: 0,

  // FooterTab
  tabBarTextColor: platform === PLATFORM.IOS ? "#737373" : "#bfc6ea",
  tabBarTextSize: platform === PLATFORM.IOS ? 14 : 11,
  activeTab: platform === PLATFORM.IOS ? "#007aff" : "#f7f7f7",
  sTabBarActiveTextColor: "#007aff",
  tabBarActiveTextColor: platform === PLATFORM.IOS ? "#2874F0" : "#f7f7f7",
  tabActiveBgColor: platform === PLATFORM.IOS ? "#cde1f9" : "#438edb",

  // Header
  toolbarBtnColor: "#438edb",
  toolbarDefaultBg: "#f7f7f7",
  toolbarHeight: 72,
  toolbarSearchIconSize: platform === PLATFORM.IOS ? 20 : 23,
  toolbarInputColor: platform === PLATFORM.IOS ? "#CECDD2" : "#f7f7f7",
  searchBarHeight: platform === PLATFORM.IOS ? 30 : 40,
  searchBarInputHeight: platform === PLATFORM.IOS ? 30 : 50,
  toolbarBtnTextColor: "#438edb",
  iosStatusbar: "light-content",
  toolbarDefaultBorder: "rgba(34,71,145,1)",
  get statusBarColor() {
    return color(this.toolbarDefaultBg)
      .darken(0.2)
      .hex();
  },
  get darkenHeader() {
    return color(this.tabBgColor)
      .darken(0.03)
      .hex();
  },

  // Icon
  iconFamily: "MaterialCommunityIcons",
  iconFontSize: platform === PLATFORM.IOS ? 30 : 28,
  iconHeaderSize: platform === PLATFORM.IOS ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: "#438edb",
  inputSuccessBorderColor: "#2b8339",
  inputErrorBorderColor: "#ed2f2f",
  inputHeightBase: 50,
  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return "#575757";
  },

  // Line Height
  buttonLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  lineHeight: platform === PLATFORM.IOS ? 20 : 24,

  // List
  listBg: "transparent",
  listBorderColor: "rgba(204,204,204,1)",
  listDividerBg: "rgba(233,235,241,1)",
  listBtnUnderlayColor: "#DDD",
  listItemPadding: platform === PLATFORM.IOS ? 10 : 12,
  listNoteColor: "#808080",
  listNoteSize: 13,
  listItemSelected: "#438edb",

  // Progress Bar
  defaultProgressColor: "#E4202D",
  inverseProgressColor: "#1A191B",

  // Radio Button
  radioBtnSize: platform === PLATFORM.IOS ? 25 : 23,
  radioSelectedColorAndroid: "rgba(34,105,179,1)",
  radioBtnLineHeight: platform === PLATFORM.IOS ? 29 : 24,
  get radioColor() {
    return this.brandPrimary;
  },

  // Segment
  segmentBackgroundColor: "rgba(34,105,179,1)",
  segmentActiveBackgroundColor: platform === PLATFORM.IOS ? "#007aff" : "#fff",
  segmentTextColor: platform === PLATFORM.IOS ? "#007aff" : "#fff",
  segmentActiveTextColor: platform === PLATFORM.IOS ? "#fff" : "#438edb",
  segmentBorderColor: platform === PLATFORM.IOS ? "#007aff" : "#fff",
  segmentBorderColorMain: platform === PLATFORM.IOS ? "#a7a6ab" : "#438edb",

  // Spinner
  defaultSpinnerColor: "rgba(34,105,179,1)",
  inverseSpinnerColor: "rgba(232,73,69,1)",

  // Tab
  tabDefaultBg: "#438edb",
  topTabBarTextColor: platform === PLATFORM.IOS ? "#6b6b6b" : "#b3c7f9",
  topTabBarActiveTextColor: platform === PLATFORM.IOS ? "#007aff" : "#fff",
  topTabBarBorderColor: platform === PLATFORM.IOS ? "#a7a6ab" : "#fff",
  topTabBarActiveBorderColor: platform === PLATFORM.IOS ? "#007aff" : "#fff",

  // Tabs
  tabBgColor: "#438edb",
  tabFontSize: 15,

  // Text
  textColor: "#333",
  inverseTextColor: "#fff",
  noteFontSize: 14,
  get defaultTextColor() {
    return this.textColor;
  },

  // Title
  titleFontfamily: "Raleway-Regular",
  titleFontSize: platform === PLATFORM.IOS ? 17 : 19,
  subTitleFontSize: platform === PLATFORM.IOS ? 11 : 14,
  subtitleColor: platform === PLATFORM.IOS ? "#000" : "#fff",
  titleFontColor: platform === PLATFORM.IOS ? "#000" : "#fff",

  // Other
  borderRadiusBase: 10,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,
  dropdownLinkColor: "#414142",
  inputLineHeight: 24,
  deviceWidth,
  deviceHeight,
  isIphoneX,
  inputGroupRoundedBorderRadius: 30,

  // iPhoneX SafeArea
  Inset: {
    portrait: {
      topInset: 24,
      leftInset: 0,
      rightInset: 0,
      bottomInset: 34
    },
    landscape: {
      topInset: 0,
      leftInset: 44,
      rightInset: 44,
      bottomInset: 21
    }
  }
};
