import variables from '@/styles/variables.module.less'
export const useDesign = () => {
  const lessVariables = variables
  const getPrefixCls = (scope: string) => `${lessVariables.namespace}-${scope}`
  return {
    variables,
    getPrefixCls
  }
}
