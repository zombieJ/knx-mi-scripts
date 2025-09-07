import React, { useState, useEffect } from "react";
import { useNavigate } from "umi";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  Splitter,
  Modal,
  App,
} from "antd";
import {
  OPEN_KNX_2_MI,
  CLOSE_KNX_2_MI,
  OPEN_MI_2_KNX,
  CLOSE_MI_2_KNX,
  BATCH_SYNC,
  generateScript,
} from "../utils/util";

export default function HomePage() {
  const { modal } = App.useApp();
  const [form] = Form.useForm();
  const [scriptText, setScriptText] = useState("");

  // 页面加载时从 localStorage 读取数据
  useEffect(() => {
    const savedData = localStorage.getItem("knxMiFormValues");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.setFieldsValue(parsedData);
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
  }, [form]);

  // 表单值改变时保存到 localStorage
  const handleValuesChange = (changedValues: any, allValues: any) => {
    localStorage.setItem("knxMiFormValues", JSON.stringify(allValues));
  };

  const onInternalFinish = (allValues: any) => {
    // 检查是否有数据
    if (
      !allValues.items ||
      !Array.isArray(allValues.items) ||
      allValues.items.length === 0
    ) {
      modal.info({
        title: "提示",
        content: "至少需要添加一组 KNX/小米 开关的映射关系",
      });
      return;
    }

    // 根据表单数据生成脚本
    const scripts: string[] = [];
    let idOffset = 0;
    const now = Date.now();

    if (allValues.items && Array.isArray(allValues.items)) {
      allValues.items.forEach((item: any) => {
        if (item && item.knxSwitchId && item.miSwitchId) {
          // 添加备注行，注明是哪个 KNX 和小米开关的
          scripts.push(
            `##### KNX: ${item.knxSwitchName || "默认房间"} (${
              item.knxSwitchId
            }) -> 小米: ${item.miSwitchName || "默认房间"} (${
              item.miDeviceId
            }.${item.miSwitchId})`
          );
          scripts.push(
            generateScript(
              OPEN_KNX_2_MI,
              item.knxSwitchName || "默认房间",
              item.knxSwitchId,
              item.miDeviceId,
              item.miSwitchId,
              idOffset++,
              now
            ),
            generateScript(
              CLOSE_KNX_2_MI,
              item.knxSwitchName || "默认房间",
              item.knxSwitchId,
              item.miDeviceId,
              item.miSwitchId,
              idOffset++,
              now
            ),
            generateScript(
              OPEN_MI_2_KNX,
              item.knxSwitchName || "默认房间",
              item.knxSwitchId,
              item.miDeviceId,
              item.miSwitchId,
              idOffset++,
              now
            ),
            generateScript(
              CLOSE_MI_2_KNX,
              item.knxSwitchName || "默认房间",
              item.knxSwitchId,
              item.miDeviceId,
              item.miSwitchId,
              idOffset++,
              now
            )
          );
        }
      });
    }

    // scripts.push(`########## 批量同步脚本 ##########`);
    // scripts.push(BATCH_SYNC);

    // 更新 scriptText 状态
    setScriptText(scripts.join("\n"));
  };

  return (
    <Splitter>
      <Splitter.Panel defaultSize="50%" style={{ paddingInline: 24 }}>
        <Typography>
          <h3>KNX-MI 映射配置</h3>
          <pre>
            <ul style={{ margin: 0 }}>
              <li>
                开关名字可以随便写，推荐自己好记的，如：
                <strong>knx-主卧-主灯</strong>
              </li>
              <li>
                实体 ID 在：<strong>设置 - 设备与服务 - 实体</strong>{" "}
                中查看。点开实体后，在弹窗右上角点击 <strong>设置</strong>{" "}
                按钮，复制 <strong>实体标识符</strong>
              </li>
              <li>
                设备 ID 在：<strong>设置 - 设备与服务 - 设备</strong>{" "}
                中查看。点开设备后，点击 <strong>信息</strong>，在弹窗右上角点击{" "}
                <strong>设置</strong> 按钮，复制 <strong>实体标识符</strong>
              </li>
              <li>
                <Typography.Text strong type="danger">
                  备份
                </Typography.Text>{" "}
                automations.yaml 文件，将生成的脚本覆盖该文件
              </li>
            </ul>
          </pre>
        </Typography>
        <Form
          form={form}
          onFinish={onInternalFinish}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} align="center" gap={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "knxSwitchName"]}
                      rules={[{ required: true, message: "必填" }]}
                    >
                      <Input placeholder="knx开关名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "knxSwitchId"]}
                      rules={[{ required: true, message: "必填" }]}
                    >
                      <Input placeholder="knx开关ID" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "miSwitchName"]}
                      rules={[{ required: true, message: "必填" }]}
                    >
                      <Input placeholder="小米开关名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "miDeviceId"]}
                      rules={[{ required: true, message: "必填" }]}
                    >
                      <Input placeholder="设备ID" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "miSwitchId"]}
                      rules={[{ required: true, message: "必填" }]}
                    >
                      <Input placeholder="小米开关ID" />
                    </Form.Item>
                  </Flex>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  添加
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ marginTop: 16 }}
                >
                  生成脚本
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Splitter.Panel>
      <Splitter.Panel defaultSize="50%" style={{ paddingInline: 24 }}>
        <Input.TextArea
          value={scriptText}
          readOnly
          style={{ height: "90vh", resize: "none" }}
        />
      </Splitter.Panel>
    </Splitter>
  );
}
