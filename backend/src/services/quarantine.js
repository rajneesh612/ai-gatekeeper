let quarantined = false;
export function activateQuarantine() {

    quarantined = true;

    console.log("🚫 System quarantined");
}

export function isQuarantined() {
    return quarantined;
}
export function releaseQuarantine() {
    setTimeout(() => {
    quarantined = false;

    console.log("✅ Quarantine released");

}, 60000);
}