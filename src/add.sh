#!/bin/bash

# Command to git add files from files.txt. tr here is to allow "'" in filenames.
CMD="cat files.txt |tr '\n' '\0' |xargs -0 git add"

# ${1} should be "-n" for dryrun.
if [ "${#}" -gt 0 ]; then
    echo "${CMD} ${1}"
    eval "${CMD} ${1}"
else
    echo "${CMD}"
    eval "${CMD}"
fi

