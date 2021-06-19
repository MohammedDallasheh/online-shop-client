import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { Upload, Modal } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";

import { errorAlert } from "../../function/alert";
import { uploadImage, deleteImage } from "../../actions/image";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// dispatchType = ['IMAGE_USER_AVATAR_U', 'IMAGE_USER_AVATAR_D']
//            OR  ['IMAGE_USER_IMGS_U', 'IMAGE_USER_IMGS_D']
const ImageUpload = ({
  resource,
  itemId,
  path,
  imgs,
  maxImage = 8,
  dispatchType = [],
}) => {
  const dispatch = useDispatch();
  const [addDispatch, deleteDispatch] = dispatchType;

  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    setFileList(
      imgs.map((img) => ({
        ...img,
        url: process.env.REACT_APP_API_SERVER + img.url,
      }))
    );
  }, [imgs]);

  const handleAdd = ({ file }) => {
    addDispatch &&
      dispatch(uploadImage(file, resource, itemId, path, addDispatch));
  };
  const handleRemove = ({ _id }) => {
    dispatch(deleteImage(_id, resource, itemId, path, deleteDispatch));
  };
  const handleChange = async ({ file, fileList }) => {
    setFileList([...fileList]);
    file.status = "done";
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(
      file.name || file.alt || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  return (
    <>
      <ImgCrop rotate>
        <Upload
          customRequest={handleAdd}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onError={(_, response) => errorAlert(response)}
          onRemove={handleRemove}
          multiple
        >
          {fileList.length < maxImage && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </ImgCrop>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        onCancel={handleCancel}
        footer={false}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
