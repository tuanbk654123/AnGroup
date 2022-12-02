import { IS_TEST_ENVIROMENT } from '~/utils/helper'

const Env = ({ color }) => {
  if (IS_TEST_ENVIROMENT())
    return (
      <div
        style={{
          backgroundColor: '#ff676780',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          color: color,
        }}
      >
        <span>Environment: TEST</span>
      </div>
    )
  return null
}

export default Env
