import { ActivityIndicator, Modal, View } from 'react-native'
import React from 'react'

const FullScreenLoader = ({ visible }: { visible: boolean }) => {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#050816ff" }}>
                <ActivityIndicator size={'large'} />
            </View>
        </Modal>
    )
}

export default FullScreenLoader
