const useCombinedRefs = (...refs) => {
    return (node) => {
        refs.forEach((ref) => {
            if (!ref) return;
            
            if (typeof ref === "function") {
                ref(node);
            } else if (ref && typeof ref === "object") {
                ref.current = node;
            }
        })
    }
}

export default useCombinedRefs;