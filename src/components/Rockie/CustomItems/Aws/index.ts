import test from '@/components/Resource/images/test.png'

/**
 * Make sure image size < 10k so it will be encoded as base64
 */
export const AwsShapes = [
    { name: 'test1', data: test, width: 100, height: 100 },
    { name: 'test2', data: test, width: 100, height: 100 },
    { name: 'test3', data: test, width: 100, height: 100 },
    { name: 'test4', data: test, width: 100, height: 100 },
]