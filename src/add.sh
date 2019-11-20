#!/bin/bash

# Command to git add files from files.txt. tr here is to allow "'" in filenames.
CMD="cat files.txt |tr '\n' '\0' |xargs -t -n1 -0 git add"

# ${1} should be "-n" for dryrun.
if [ "${#}" -gt 0 ]; then
    printf "%s\n" "${CMD} ${1}"
    eval "${CMD} ${1}"
else
    printf "%s\n" "${CMD}"
    eval "${CMD}"
fi
