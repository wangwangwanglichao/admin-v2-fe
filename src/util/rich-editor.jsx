/*Rich-Editor-Component*/
/*富文本编辑器组件*/
import React from "react";
import Simditor from "simditor";
import "simditor/styles/simditor.scss";
import "./rich-editor.scss";

// 通用富文本编辑器组件:
class RichEditor extends React.Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      this.loadEditor();
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.defaultDetail !== nextProps.defaultDetail) {
         this.simditor.setValue(nextProps.defaultDetail);
      }
   }

   /*加载富文本编辑器*/
   loadEditor() {
      let element = this.refs['textarea'];
      this.simditor = new Simditor({
         textarea: $(element),
         defaultValue: this.props.placeholder || "请输入内容",
         upload: {
            url: "/manage/product/richtext_img_upload.do",
            defaultImage: "",
            fileKey: "upload_file"
         }
      });
      this.bindEditorEvent();
   }
   /*初始化富文本编辑器的事件*/
   bindEditorEvent() {
      this.simditor.on("valuechanged", () => {
         this.props.onValueChange(this.simditor.getValue())
      })
   }

   render() {
      return (
         <div className="rich-editor">
            <textarea ref="textarea"></textarea>
         </div>
      )
   }
}

export default RichEditor;