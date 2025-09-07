const data = require('./data.js').default;
const fs = require('fs');

// KNX 开 -> 小米 开
const OPEN_KNX_2_MI = `
- id: '【编号】'
  alias: '【房间】 - open 【KNX设备ID】 2 【小米设备按键ID】'
  description: ''
  triggers:
  - trigger: state
    entity_id:
    - 【KNX设备ID】
    to: 'on'
  conditions:
  - condition: device
    type: is_off
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
  actions:
  - type: turn_on
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
  mode: single
`.trim();

// KNX 关 -> 小米 关
const CLOSE_KNX_2_MI = `
- id: '【编号】'
  alias: '【房间】 - close 【KNX设备ID】 2 【小米设备按键ID】'
  description: ''
  triggers:
  - trigger: state
    entity_id:
    - 【KNX设备ID】
    to: 'off'
  conditions:
  - condition: device
    type: is_on
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
  actions:
  - type: turn_off
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
  mode: single
`.trim();

// 小米 开 -> KNX 开
const OPEN_MI_2_KNX = `
- id: '【编号】'
  alias: '【房间】 - open 【小米设备按键ID】 2 【KNX设备ID】'
  description: ''
  triggers:
  - type: turned_on
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
    trigger: device
  conditions:
  - condition: state
    entity_id: 【KNX设备ID】
    state: 'off'
  actions:
  - action: light.turn_on
    metadata: {}
    data: {}
    target:
      entity_id: 【KNX设备ID】
  mode: single
`.trim();

// 小米 关 -> KNX 关
const CLOSE_MI_2_KNX = `
- id: '【编号】'
  alias: '【房间】 - close 【小米设备按键ID】 2 【KNX设备ID】'
  description: ''
  triggers:
  - type: turned_off
    device_id: 【小米设备ID】
    entity_id: 【小米设备按键ID】
    domain: switch
    trigger: device
  conditions:
  - condition: state
    entity_id: 【KNX设备ID】
    state: 'on'
  actions:
  - action: light.turn_off
    metadata: {}
    data: {}
    target:
      entity_id: 【KNX设备ID】
  mode: parallel
`.trim();

const BATCH_SYNC = `
- id: '${Date.now() - 233}'
  alias: resync all knx 2 mi
  description: ""
  triggers:
    - trigger: homeassistant
      event: start
  conditions: []
  actions:
    - action: automation.turn_off
      metadata: {}
      data:
        stop_actions: true
      target:
        label_id: mi_2_knx
    - delay: "00:01:00"
    - action: automation.turn_on
      metadata: {}
      data: {}
      target:
        label_id: sync
  mode: single
`;

const scripts = [];

let idOffset = 0;
const now = Date.now();

const idList = [];

data.forEach(({ _name, ...rest }) => {
  scripts.push(`########## ${_name} ##########`);

  Object.keys(rest).forEach((knxId) => {
    const deviceId = rest[knxId][0];
    const entityId = rest[knxId][1];

    const replaceFn = (template) => {
      idOffset += 1;

      const ret =
        template
          // 替换占位符
          .replaceAll('【房间】', _name)
          .replaceAll('【编号】', now + idOffset)
          .replaceAll('【小米设备ID】', deviceId)
          .replaceAll('【小米设备按键ID】', entityId)
          .replaceAll('【KNX设备ID】', knxId) + '\n';

      const aliasId = ret
        .match(/alias: '(.+?)'/)[1]
        .replaceAll('-', ' ')
        .replaceAll('.', ' ')
        .replace(/ +/g, '_');
      // console.log(`生成脚本: ${aliasId}`);

      return ret;
    };

    scripts.push(
      // 替换
      replaceFn(OPEN_KNX_2_MI),
      replaceFn(CLOSE_KNX_2_MI),
      replaceFn(OPEN_MI_2_KNX),
      replaceFn(CLOSE_MI_2_KNX),
    );
  });

  scripts.push(``);
});

scripts.push(`########## 批量同步脚本 ##########`);
scripts.push(BATCH_SYNC);

// 写入文件
const fileText = scripts.join('\n');

fs.writeFileSync('./auto_scripts.yaml', fileText, 'utf-8');