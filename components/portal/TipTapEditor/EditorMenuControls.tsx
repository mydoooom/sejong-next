import {
  LinkBubbleMenu, MenuButtonAddTable,
  MenuButtonBold, MenuButtonBulletedList, MenuButtonEditLink, MenuButtonHighlightColor, MenuButtonHorizontalRule,
  MenuButtonItalic, MenuButtonOrderedList,
  MenuButtonRedo, MenuButtonStrikethrough, MenuButtonTextColor, MenuButtonUnderline,
  MenuButtonUndo, MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading, MenuSelectTextAlign, TableBubbleMenu,
  isTouchDevice, MenuButtonIndent, MenuButtonUnindent,
} from 'mui-tiptap'

export default function EditorMenuControls () {
  return (
    <MenuControlsContainer>
      <MenuButtonUndo/>
      <MenuButtonRedo/>
      <MenuDivider/>
      <MenuSelectHeading/>
      <MenuDivider/>
      <MenuButtonBold/>
      <MenuButtonItalic/>
      <MenuButtonUnderline/>
      <MenuButtonStrikethrough/>
      <MenuButtonTextColor
        swatchColors={[
          { value: "#000000", label: "Black" },
          { value: "#ffffff", label: "White" },
          { value: "#888888", label: "Grey" },
          { value: "#ff0000", label: "Red" },
          { value: "#ff9900", label: "Orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#00d000", label: "Green" },
          { value: "#0000ff", label: "Blue" },
        ]}
      />
      <MenuButtonHighlightColor
        swatchColors={[
          { value: "#595959", label: "Dark grey" },
          { value: "#dddddd", label: "Light grey" },
          { value: "#ffa6a6", label: "Light red" },
          { value: "#ffd699", label: "Light orange" },
          { value: "#ffff00", label: "Yellow" },
          { value: "#99cc99", label: "Light green" },
          { value: "#90c6ff", label: "Light blue" },
          { value: "#8085e9", label: "Light purple" },
        ]}
      />
      <MenuDivider/>
      <MenuSelectTextAlign/>
      <MenuDivider/>
      <LinkBubbleMenu/>
      <MenuButtonEditLink/>
      <MenuDivider/>
      <MenuButtonOrderedList/>
      <MenuButtonBulletedList/>
      {isTouchDevice() && (
        <>
          <MenuButtonIndent />
          <MenuButtonUnindent />
        </>
      )}
      <MenuDivider/>
      <MenuButtonAddTable />
      <TableBubbleMenu />
      <MenuButtonHorizontalRule/>
    </MenuControlsContainer>
  )
}
