import {NG} from 'ng-lib-tsx';
import {formFomatValues} from 'ng-layout-form';

/**
 * 转换form表单值的 {value, label}
 * @param values form表单值
 */
function getValue(values) {
  values = NG.deepCopy(values);
  Object.keys(values).forEach(key => {
    if (NG.isObject(values[key]) && values[key].hasOwnProperty('value')) {
      values[key] = values[key].value;
    }
  });
  return values;
}

/**
 * 获取form表单集的值
 * @param key 主键
 * @param initValues 初始值
 */
export function getFormValues(key, initValues = {}) {
  // ids form表单的id集合
  return (...ids) => {
    return formFomatValues(
      key,
      ids.reduce(
        (p, id) => {
          const tmpValues = NG.getCmp(id)
            ?.getApi()
            ?.getValues();
          tmpValues && p.push(getValue(tmpValues));
          return p;
        },
        [getValue(initValues)]
      )
    );
  };
}

/**
 * 验证表单集
 * @param ids 表单集的id
 */
export async function validForm(...ids) {
  try {
    const fds = await Promise.all(
      ids.map(id =>
        NG.getCmp(id)
          ?.getApi()
          ?.validateForm()
      )
    );
    return !!fds;
  } catch {
    return false;
  }
}

/**
 * 转换通用帮助的value值
 * @param fd form表单值
 * @param nameSuffix
 */
export function convertHelpValue(fd, nameSuffix = '_EXName') {
  Object.keys(fd).forEach(key => {
    const labelName = `${key}${nameSuffix}`;
    if (fd.hasOwnProperty(labelName) && !NG.isObject(fd[key])) {
      fd[key] = {value: fd[key], label: fd[labelName] || ''};
    }
  });
  return fd;
}

/**
 * 设置form表单的值
 * @param key 字段name
 * @param value 值
 * @param formId form表单的id
 */
export function setFromItem(key, value, formId = 'form1') {
  NG.getCmp(formId)
    .getApi()
    ?.getItem(key)
    ?.setValue(value);
}
