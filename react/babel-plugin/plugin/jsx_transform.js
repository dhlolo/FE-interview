module.exports = function({ types: t }) {
    return {
        visitor: {
            JSXElement(path) {
                const { openingElement } = path.node
                const tagName = openingElement.name.name;
                const attributes = t.nullLiteral()
                const reactIdentifier = t.identifier("React")
                const createElementIdentifier = t.identifier("createElement")
                const callee = t.memberExpression(
                    reactIdentifier,
                    createElementIdentifier
                )
                const args = [t.stringLiteral(tagName), attributes];
                const callRCExpression = t.callExpression(callee, args);
                callRCExpression.arguments = callRCExpression.arguments.concat(path.node.children);
                path.replaceWith(callRCExpression, path.node);
            },
            JSXText(path) {
                const nodeText = path.node.value;
                path.replaceWith(t.stringLiteral(nodeText), path.node)
            }
        }
    }
}