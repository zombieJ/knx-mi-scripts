import React, { useState } from "react";
import { useNavigate } from "umi";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Typography,
  Splitter,
} from "antd";

export default function HomePage() {
  const [scriptText, setScriptText] = useState("helloWorld");

  const onInternalFormChange = (changedValues: any, allValues: any) => {
    setScriptText(JSON.stringify(allValues, null, 2));
  };

  return (
    <Splitter>
      <Splitter.Panel defaultSize="50%" style={{ paddingInline: 24 }}>
        <Typography.Title level={3}>KNX-MI 映射配置</Typography.Title>
        <Form onValuesChange={onInternalFormChange}>
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex key={key} align="center" gap={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "knxSwitchName"]}
                      rules={[{ required: true, message: "请输入knx开关名称" }]}
                    >
                      <Input placeholder="knx开关名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "knxSwitchId"]}
                      rules={[{ required: true, message: "请输入knx开关ID" }]}
                    >
                      <Input placeholder="knx开关ID" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "miSwitchName"]}
                      rules={[
                        { required: true, message: "请输入小米开关名称" },
                      ]}
                    >
                      <Input placeholder="小米开关名称" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "miSwitchId"]}
                      rules={[{ required: true, message: "请输入小米开关ID" }]}
                    >
                      <Input placeholder="小米开关ID" />
                    </Form.Item>
                  </Flex>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  添加
                </Button>
              </>
            )}
          </Form.List>
        </Form>
      </Splitter.Panel>
      <Splitter.Panel defaultSize="50%" style={{ paddingInline: 24 }}>
        <Typography>
          <pre style={{ margin: 0 }}>{scriptText}</pre>
        </Typography>
      </Splitter.Panel>
    </Splitter>
  );
}
